import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import Modal from './ui/Modal';

type List = {
  name: string;
  description: string;
  public: boolean;
  items: number[];
};

const sampleData: List[] = [
  {
    name: 'Movies I love',
    description: 'A curated list of my all-time favorite movies across various genres.',
    public: false,
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    name: 'TV Shows',
    description: 'A list of TV shows that I have watched and enjoyed.',
    public: false,
    items: [1, 2, 3, 4, 5],
  },
];

export default function AddToList({ disclosure }: { disclosure: disclosure }) {
  const { isOpen, onOpenChange } = disclosure;

  return (
    <Modal disclosure={disclosure}>
      {(onClose) => (
        <>
          <ModalHeader className='flex justify-center'>
            <h4 className='text-xl font-semibold text-Primary/100'>Add to list</h4>
          </ModalHeader>
          <ModalBody>
            {sampleData.length ? (
              sampleData.map((list) => <List key={list.name} list={list} />)
            ) : (
              <p className='text-center text-Grey/300'>
                No lists found. It looks like you haven&apos;t created any lists yet. Start by adding a new list.
              </p>
            )}
            <Button className='mt-5 border-border text-white hover:border-Primary/500' variant='ghost' color='primary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='size-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
              </svg>
              Create new list
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button className='bg-Grey/800 hover:bg-Grey/700' onPress={onClose}>
              Close
            </Button>
            <Button className='bg-Primary/500 hover:bg-Primary/600' onPress={onClose}>
              Save
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
}

function List({ list }: { list: List }) {
  return (
    <div className='flex justify-between'>
      <Checkbox defaultSelected>{list.name}</Checkbox>
      <span className='rounded-md bg-Grey/800 px-2 py-1.5 text-sm text-Grey/100'>{list.items.length} Items</span>
    </div>
  );
}
