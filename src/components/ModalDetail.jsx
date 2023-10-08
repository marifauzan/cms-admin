import { Descriptions, Modal } from 'antd';
import { formatBordDate, formatInputDate } from '../utils/formatDate';

export default function ModalDetail({ open, onCancel, detail }) {
  const items = [
    {
      key: '1',
      label: 'Nama',
      children: detail?.name,
    },
    {
      key: '2',
      label: 'Jenis Kelamin',
      children: detail?.gender == 'p' ? 'Pria' : 'wanita',
    },
    {
      key: '3',
      label: 'Tanggal Lahir',
      children: formatBordDate(detail?.born_date),
    },
    {
      key: '4',
      label: 'Tanggal Input',
      children: formatInputDate(detail?.created_at),
    },
    {
      key: '5',
      label: 'File',
      children: detail?.file,
    },
    {
      key: '6',
      label: 'Address',
      children: detail?.address,
    },
  ];
  return (
    <Modal
      title="Detail User Info"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      {/* Modal Content */}
      <Descriptions items={items} layout="vertical" />
    </Modal>
  );
}
