'server only';

import { getPopularTvShows } from '../TMDB';

//* Users



// export const createUser = async (user: User) => {
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   const { data, error } = await supabase
//     .from('users')
//     .insert([{ ...user, password: hashedPassword }])
//     .select();

//   if (error?.code === '23505') return { data: null, error: { message: 'An account with that email already exists.|' } };
//   return { data, error };
// };

// export const findOrCreateUser = async (user: User) => {
//   const { data } = await supabase.from('users').select().eq('email', user.email).single();
//   if (data) return { data, error: null };
//   return await createUser(user);
// };

// export const getUser = async (email: string, password: string) => {
//   const { data, error } = await supabase.from('users').select().eq('email', email).single();
//   const errorReturn = { data: null, error: { message: "We can't find an account with that email and password.|" } };
//   if (error) return errorReturn;
//   const match = await bcrypt.compare(password, data.password);
//   if (!match) return errorReturn;
//   return { data, error };
// };

// export const getUserFullName = async (email: string) => {
//   const { data } = await supabase.from('users').select('name').eq('email', email).single();
//   return data?.name;
// };

export const getWatchList = async () => {
  const watchList: TMDBResponse = await getPopularTvShows();
  return watchList;
};

export const getMovies = async () => {
  const movies: TMDBResponse = await getPopularTvShows();
  return movies;
};

export const getTvShows = async () => {
  const shows: TMDBResponse = await getPopularTvShows();
  return shows;
};
