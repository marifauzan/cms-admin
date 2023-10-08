import { DatePicker, Form, Input, Modal, Radio } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';

export default function ModalTambah({ open, onCancel }) {
  const [form] = Form.useForm();
  const token = sessionStorage.getItem('tokenCMSAdmin');

  const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = useState(false);

    const values = Form.useWatch([], form);

    useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(
          () => {
            setSubmittable(true);
          },
          () => {
            setSubmittable(false);
          },
        );
    }, [values]);

    if (submittable) {
      return (
        <button
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          Submit
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="text-white bg-gray-400 dark:bg-gray-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled
        >
          Submit
        </button>
      );
    }
  };

  const onFinish = (values) => {
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/testapi/user`,
        {
          name: values.nama,
          address: values.alamat,
          gender: values.jenis_kelamin,
          born_date: moment(values.tanggal_lahir).format('YYYY-MM-DD'),
        },
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
    <Modal title="Tambah User" open={open} onCancel={onCancel} footer={null}>
      {/* Modal Content */}
      <Form
        onFinish={onFinish}
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="nama"
          label="Nama"
          rules={[
            {
              required: true,
              min: 8,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="alamat" label="Alamat">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="jenis_kelamin" label="Jenis Kelamin">
          <Radio.Group>
            <Radio value="p">Pria</Radio>
            <Radio value="l">Wanita</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="tanggal_lahir" label="Tanggal Lahir">
          <DatePicker
            style={{
              width: '100%',
            }}
            showToday={false}
          />
        </Form.Item>

        <Form.Item>
          <SubmitButton form={form} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
