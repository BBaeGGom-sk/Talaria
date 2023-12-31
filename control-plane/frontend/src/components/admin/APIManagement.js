import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import APIEditModal from "./APIEditModal";
import CustomAxios from "../axios/CustomAxios";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const APIManagement = () => {
  const [response, setResponse] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [apis, setApis] = useState({});
  const access_token = useSelector((state) => state.userInfo.access_token);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      CustomAxios.get(`apis/admin?status=approved`, {
        headers: { Authorization: `Bearer ${access_token}` },
      }).then((res) => {
        setResponse(res.data);
      });
    } catch (error) { }
  }, []);

  const handleSwitchChange = (id, idx) => {
    if (response[idx].status === "APPROVED_ON") {
      try {
        CustomAxios.patch(
          `apis/admin`,
          {
            apis_id: id,
            status: "APPROVED_OFF",
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        ).then((res) => {
          const newResponse = [...response];
          newResponse[idx].status =
            newResponse[idx].status === "APPROVED_ON"
              ? "APPROVED_OFF"
              : "APPROVED_ON";
          setResponse(newResponse);
        });
      } catch (error) { }
    } else {
      try {
        CustomAxios.patch(
          `apis/admin`,
          {
            apis_id: id,
            status: "APPROVED_ON",
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        ).then((res) => {
          const newResponse = [...response];
          newResponse[idx].status =
            newResponse[idx].status === "APPROVED_ON"
              ? "APPROVED_OFF"
              : "APPROVED_ON";
          setResponse(newResponse);
        });
      } catch (error) { }
    }
  };

  const handleEdit = (idx) => {
    setApis(response[idx]);
    setIsEditModalOpen(true);
  };

  const handleDelete = (idx, id) => {
    try {
      CustomAxios.delete(`apis/admin/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      }).then((res) => {
        const newResponse = [...response];
        newResponse.splice(idx, 1);
        setResponse(newResponse);
      });
    } catch (error) { }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAccept = (updatedApiInfo) => {
    const updatedResponse = response.map((api) =>
      api.apis_id === updatedApiInfo.apis_id ? updatedApiInfo : api
    );
    setResponse(updatedResponse);
    setIsEditModalOpen(false);
  };

  const goProductPage = (id) => {
    return navigate("/admin/api/management/" + id);
  }

  return (
    <>
      <Box bgColor='white' borderRadius={20} height="100%" minHeight="100%" minH="82vh" >
        <TableContainer marginLeft="3%" marginRight="3%" paddingTop="2%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="xs">Developer</Th>
                <Th fontSize="xs">API Name</Th>
                <Th fontSize="xs">QPS (Quota Per Second)</Th>
                <Th fontSize="xs">Available</Th>
                <Th fontSize="xs"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {response.map((item, idx) => (
                <Tr key={idx}>
                  <Td fontSize="xs" onClick={() => goProductPage(item.apis_id)}>{item.developer_email}</Td>
                  <Td fontSize="xs" onClick={() => goProductPage(item.apis_id)}>{item.name}</Td>
                  <Td fontSize="xs" onClick={() => goProductPage(item.apis_id)}>{item.quota}</Td>
                  <Td>
                    <Switch
                      onChange={() => handleSwitchChange(item.apis_id, idx)}
                      isChecked={item.status === "APPROVED_ON"}
                    ></Switch>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                        variant="link"
                      />
                      <MenuList>
                        <MenuItem
                          icon={<EditIcon />}
                          onClick={() => handleEdit(idx)}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<DeleteIcon />}
                          onClick={() => handleDelete(idx, item.apis_id)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <APIEditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          apiInfo={apis}
          onAccept={handleAccept}
        />
      </Box>
    </>
  );
};

export default APIManagement;
