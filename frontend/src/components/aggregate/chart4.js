import React, { useEffect, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import * as StompJs from "@stomp/stompjs";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
function Chart4() {
  const client = useRef({});
  const [data, setData] = useState([]);
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/ws/monitoring",
      onConnect: () => {
        // Do something, all subscribes must be done is this callback
        console.log("연결 SUB");
        subscribe();
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate(); // 활성화된 연결 끊기
  };

  const subscribe = () => {
    client.current.subscribe("/sub/usage-ranking", (res) => {
      // server에게 메세지 받으면
      console.log(res.body);
      const json_body = JSON.parse(res.body);
      setData(json_body.data.slice());
      //   console.log(data.map((info, rank) => info.url));
    });
  };

  const getTextColor = (type) => {
    if (type === "GET") {
      return "#38A169";
    } else if (type === "POST") {
      return "#DD6B20";
    } else if (type === "DELETE") {
      return "#E53E3E";
    } else if(type === "PATCH"){
      return "#805AD5";
    } else{
      return "#3182CE"
    }
  };



  useEffect(() => {
    connect();
    // const interval = setInterval(() => {

    // }, 1000);

    return () => {
      //   clearInterval(interval);
      disconnect();
    };
  }, []);

  return (
    <>
      <Box bg="white" w="40vw" h="55vh" borderRadius="20px" boxShadow="lg">
        <Text fontWeight="Bold" p={4}>
          API4
        </Text>
        <TableContainer>
          <Table variant="simple" w="100%" h="100%" minH="50px" maxW="100%">
            <Thead>
              <Tr>
                <Th>Ranking</Th>
                <Th>URL</Th>
                <Th>METHOD</Th>
                <Th isNumeric>USAGE</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((info, rank) => (
                <Tr key={rank}>
                  <Td>
                  <div style={{ margin: "0 auto" , textAlign:"center"}}>{info.ranking}</div>
                  </Td>
                  <Td>{info.url}</Td>
                  <Td color={"white"} fontWeight="Bold" border="none">
                  <div style={{backgroundColor:getTextColor(info.method), 
                            width:"100%",
                            height:"100%",
                            display: "flex",
                            justifyContent: "center",
                            borderRadius:"7px",
                            alignItems: "center",}} > {info.method}</div>
                    </Td>
                  <Td isNumeric>
                  <div style={{ margin: "0 auto" , textAlign:"center"}}>{info.usage}</div>
                    </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
export default Chart4;
