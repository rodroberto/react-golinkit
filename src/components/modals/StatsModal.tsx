import Modal from '../common/Modal';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatsModal = ({ isOpen, onClose }: StatsModalProps) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Stats'
      body={
        <>
          
        </>
      }
    />
  );
};

export default StatsModal;
