import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Link, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import Footer from "../components/footer/Footer";
import image from "../assets/img/BasicImage.png";
import logo from "../assets/img/Talaria-logo-light.png";
import { useDispatch } from "react-redux";
import { setUser } from "../components/slices/UserInfoSlice";
import React, { useState } from 'react';
import CustomAxios from '../components/axios/CustomAxios'

function SignIn() {

    const textColor = useColorModeValue("gray.400", "white");
    const bgForm = useColorModeValue("white", "navy.800");
    const titleColor = useColorModeValue("gray.700", "blue.500");
    const dispatch = useDispatch();
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleLogin = () => {

        try {
            CustomAxios.post(`auth/login`,
                {
                    email: email,
                    password: password
                })
                .then((res) => {

                    dispatch(setUser(res.data));
                    
                    if(res.status === 200) {
                        toast({
                            title:"WELCOME TO TALARIA !",
                            position:"top",
                            status:"success",
                            variant:"subtle",
                            isClosable:"true",
                        })
                    }
                })
        } catch(error) {
            alert(error);
        }
    }

    return (
        <>
            <Box>
                <Flex
                    direction='column'
                    alignSelf='center'
                    justifySelf='center'
                    overflow='hidden'
                >
                    <Box
                        position='absolute'
                        minH={{ base: '70vh', md: '50vh' }}
                        maxH={{ base: '70vh', md: '50vh' }}
                        w={{ md: 'calc(100vw - 50px)' }}
                        maxW={{ md: 'calc(100vw - 50px)' }}
                        left='0'
                        right='0'
                        bgRepeat='no-repeat'
                        overflow='hidden'
                        zIndex='-1'
                        top='0'
                        bgImage={image}
                        bgSize='cover'
                        mx={{ md: 'auto' }}
                        mt={{ md: '14px' }}
                        borderRadius={{ base: '0px', md: '20px' }}
                    >
                        <Box w='100vw' h='100vh' bg='blue.500' opacity='0.8'></Box>
                    </Box>
                    <Flex
                        direction='column'
                        textAlign='center'
                        justifyContent='center'
                        align='center'
                        mt='125px'
                    >
                        <Image boxSize='100px'
                            objectFit='cover'
                            src={logo}
                            alt='Talaria Logo'
                        />
                        <Text fontSize='4xl' color='white' fontWeight='bold'>
                            Talaria
                        </Text>
                    </Flex>
                    <Flex
                        w="100%"
                        h="100%"
                        alignItems="center"
                        justifyContent="center"
                        mb="60px"
                        mt={{ base: "10px", md: "20px" }}
                    >
                        <Flex
                            zIndex="2"
                            direction="column"
                            w="445px"
                            background="transparent"
                            borderRadius="15px"
                            p="40px"
                            mx={{ base: "100px" }}
                            mb={{ base: "20px", md: "auto" }}
                            bg={bgForm}
                            boxShadow={useColorModeValue(
                                "0px 5px 14px rgba(0, 0, 0, 0.05)",
                                "unset"
                            )}
                        >
                        <Text
                            fontSize="xl"
                            color={textColor}
                            fontWeight="bold"
                            textAlign="center"
                            mb="22px"
                        >
                            Welcome To Talaria !
                        </Text>
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="normal">
                                ID
                            </FormLabel>
                            <Input
                                variant="auth"
                                fontSize="sm"
                                type="text"
                                placeholder="Your ID"
                                mb="24px"
                                size="lg"
                                w="100%"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormLabel fontSize="sm" fontWeight="normal">
                                Password
                            </FormLabel>
                            <Input
                                variant="auth"
                                fontSize="sm"
                                type="password"
                                placeholder="Your password"
                                mb="24px"
                                size="lg"
                                w="100%"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        HandleLogin();
                                    }
                                }}
                            />
                            <Button
                                fontSize="10px"
                                variant="dark"
                                fontWeight="bold"
                                w="100%"
                                h="45"
                                mb="24px"
                                onClick={() => HandleLogin()}
                            >
                                SIGN IN
                            </Button>
                        </FormControl>
                        <Flex
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            maxW="100%"
                            mt="0px"
                        >
                            <Text color={textColor} fontWeight="medium">
                            Do you want a account? {" "}
                            <Link
                                color={titleColor}
                                as="span"
                                ms="5px"
                                href="#"
                                fontWeight="bold"
                            >
                                Account registration
                            </Link>
                            </Text>
                        </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Box px='24px' mx='auto' width='1044px' maxW='100%'>
                    <Footer />
                </Box>
            </Box>
        </>
    );
}

export default SignIn;