import { Modal } from 'antd';
import axios from 'axios';

export default function ModalConfirmationDelete({ open, onCancel, id }) {
  const token = sessionStorage.getItem('tokenCMSAdmin');

  const onFinish = () => {
    axios
      .delete(
        `${import.meta.env.VITE_BASE_URL}/testapi/user/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        onCancel();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal open={open} onCancel={onCancel} footer={null}>
      {/* Modal Content */}
      <div className="flex flex-col justify-center items-center w-full gap-2">
        <div className="text-2xl">Konfirmasi Delete</div>
        <div className="text-base text-gray-400">
          Apakah anda yakin ingin hapus user ini?
        </div>
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => onCancel()}
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Batal
          </button>
          {id !== null && id !== '' && (
            <button
              onClick={() => onFinish()}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Yakin!
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
