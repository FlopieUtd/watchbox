import { Modal } from "src/components/Modal";
import { Watch } from "src/types";
import { getCompressedImageSrc } from "src/utils/getImageSrc";
import { watches } from "src/utils/watches";

export interface AddWatchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (watch: Watch) => void;
}

export const AddWatchModal = ({
  isVisible,
  onClose,
  onAdd,
}: AddWatchModalProps) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="flex h-[80vh] w-[960px] flex-col relative overflow-auto">
        <div className="grid grid-cols-5 w-full">
          {watches.map((watch) => (
            <button
              key={watch.id}
              className=""
              onClick={() => {
                onAdd(watch);
                onClose();
              }}
            >
              <img className="" src={getCompressedImageSrc(watch)} alt="alt" />
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};
