import { Breadcrumb, Layout, Menu, Spin, Table, message, theme } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatBordDate, formatInputDate } from '../utils/formatDate';
import ModalWrapper from '../utils/ModalWrapper';
import ModalTambah from '../components/ModalTambah';
import { useNavigate } from 'react-router-dom';
import ModalDetail from '../components/ModalDetail';
import ModalEdit from '../components/ModalEdit';
import ModalConfirmationDelete from '../components/ModalConfirmationDelete';
const { Header, Content, Footer } = Layout;

export default function Dashboard() {
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDetail, setModalOpenDetail] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem('tokenCMSAdmin');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModalDetail = () => {
    setModalOpenDetail(true);
  };

  const handleCloseModalDetail = () => {
    setModalOpenDetail(false);
  };

  const handleOpenModalEdit = () => {
    setModalOpenEdit(true);
  };

  const handleCloseModalEdit = () => {
    setModalOpenEdit(false);
  };

  const handleOpenModalDelete = () => {
    setModalOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setModalOpenDelete(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/testapi/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const dataWithIndex = response.data.data.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
          setDataUser(dataWithIndex);
        })
        .catch((e) => {
          setLoading(false);
          message.error('Failed to fetch data. Please try again later.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [modalOpen, modalOpenEdit, modalOpenDelete]);

  const logout = () => {
    sessionStorage.removeItem('tokenCMSAdmin');
    navigate('/');
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Alamat',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'P/W',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => {
        if (gender == 'p') return 'Pria';
        if (gender == 'l') return 'Wanita';
      },
    },
    {
      title: 'Tanggal Lahir',
      dataIndex: 'born_date',
      key: 'born_date',
      render: (born_date) => {
        return formatBordDate(born_date);
      },
    },
    {
      title: 'Tanggal Input',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => {
        return formatInputDate(created_at);
      },
    },
    {
      title: 'Aksi',
      dataIndex: '',
      key: 'x',
      render: (_, record) => {
        return (
          <div className="flex gap-4 items-center">
            <svg
              onClick={() => {
                setDetail(record);
                handleOpenModalDetail();
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:stroke-blue-300 stroke-blue-500 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <svg
              onClick={() => {
                setDetail(record);
                handleOpenModalEdit();
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:stroke-yellow-300 stroke-yellow-500 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <svg
              onClick={() => {
                setDeleteId(record.id);
                handleOpenModalDelete();
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:stroke-red-300 stroke-red-500 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Layout className="layout">
        {/* Header */}
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo w-6 h-6 bg-blue-400 rounded-full mr-4"></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: 1,
                label: 'Dashboard',
              },
              {
                key: 2,
                label: 'About',
              },
              {
                key: 3,
                label: 'Logout',
                onClick: () => logout(),
                style: { color: 'red' },
              },
            ]}
          />
        </Header>

        {/* Content */}
        <Content
          style={{
            padding: '0 50px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
              padding: 50,
            }}
          >
            <button
              onClick={handleOpenModal}
              type="button"
              className="mb-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Tambah User
            </button>
            <Spin spinning={loading}>
              <Table
                dataSource={dataUser}
                columns={columns}
                rowKey={(item) => item.id}
                pagination={{
                  position: ['bottomCenter'],
                  pageSize: 7,
                }}
              />
            </Spin>
          </div>
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          CMS Admin ©2023
        </Footer>
      </Layout>
      <ModalWrapper open={modalOpen}>
        <ModalTambah open={modalOpen} onCancel={handleCloseModal} />
      </ModalWrapper>
      <ModalWrapper open={modalOpenDetail}>
        <ModalDetail
          open={modalOpenDetail}
          onCancel={handleCloseModalDetail}
          detail={detail}
        />
      </ModalWrapper>
      <ModalWrapper open={modalOpenEdit}>
        <ModalEdit
          open={modalOpenEdit}
          onCancel={handleCloseModalEdit}
          detail={detail}
        />
      </ModalWrapper>
      <ModalWrapper open={modalOpenDelete}>
        <ModalConfirmationDelete
          open={modalOpenDelete}
          onCancel={handleCloseModalDelete}
          id={deleteId}
        />
      </ModalWrapper>
    </>
  );
}
