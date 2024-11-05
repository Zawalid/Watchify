/*
 * This Appwrite function is meant to be executed every time a new user registers :
  * 1. Create a new document in the profiles collection for the user
  * 2. Create a new document in the watchlists collection for the user
  * 3. Set the appropriate permissions for the user on the created documents
  
 ? However since Appwrite is still facing a bug with `users.*.create` event when using OAuth, we have to listen on `users.*.sessions.*.create` event instead
  */

import { Client, Databases, ID, Permission, Query, Role, Users } from 'node-appwrite';

const DATABASE_ID = process.env.DATABASE_ID ?? '6727f7f10026c41951ee';
const PROFILES_COLLECTION_ID =
  process.env.PROFILES_COLLECTION_ID ?? '6727f8040026ddec4f70';
const WATCHLISTS_COLLECTION_ID =
  process.env.WATCHLISTS_COLLECTION_ID ?? '672958cf00155f79db8c';

function setPermissions(userId) {
  return [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ];
}

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');

  const users = new Users(client);
  const databases = new Databases(client);

  try {
    // Get the registered user
    const user = await users.get(req.body.userId);

    // Check if the user is already initialized
    const profileList = await databases.listDocuments(
      DATABASE_ID,
      PROFILES_COLLECTION_ID,
      [Query.equal('account_id', user.$id)]
    );

    if (profileList.documents.length > 0) {
      log('Profile already initialized for user', user.email);
      return res.json('Profile already initialized for user', user.email);
    }

    log('Initializing profile for user', user.email);
    // Save the user profile
    const profile = await databases.createDocument(
      DATABASE_ID,
      PROFILES_COLLECTION_ID,
      ID.unique(),
      { account_id: user.$id, name: user.name, email: user.email },
      setPermissions(user.$id)
    );
    // Initialize a watchlist for the user
    await databases.createDocument(
      DATABASE_ID,
      WATCHLISTS_COLLECTION_ID,
      ID.unique(),
      { visibility: 'private', owner: profile.$id, items: [] },
      setPermissions(user.$id)
    );
    // Log the success
    log('Profile initialized successfully for user', user.email);
    return res.json('Profile initialized successfully for user', user.email);
  } catch (err) {
    error('Failed to initialize profile', err);
    return res.json({
      message: 'Failed to initialize profile',
      error: err,
    });
  }
};
