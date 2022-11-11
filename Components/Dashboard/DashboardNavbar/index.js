import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { clear, decrement, increament } from "../../../store/cartSlice";
import {
  cartTotalPriceSelector,
  cartTotalSelector,
} from "../../../store/selectors";

const DashboardNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const total = useSelector(cartTotalSelector);

  const cart = useSelector((state) => state.cart);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPriceSelector);
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>Depdep</Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={onOpen}>
              {colorMode === "light" ? <BsFillCartFill /> : <BsFillCartFill />}
              <Badge colorScheme="red">{total}</Badge>
            </Button>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
      <Drawer onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Detail Cart</DrawerHeader>
          <DrawerBody>
            <Flex align="center">
                {cart.length > 0 ? (

                    <Button
                    colorScheme="red"
                    onClick={() => {
                        dispatch(clear());
                    }}
                    >
                Delete Cart
              </Button>
                  ): (
                    <Box>Ups! Not Item, Please Buy Now</Box>
                  )}
            </Flex>
            {cart.map((cartItem, i) => (
              <React.Fragment key={i}>
                <Flex direction="row" mt="4">
                  <Box flex={1}>
                    <Image
                      rounded="lg"
                      height={230}
                      width={282}
                      objectFit="cover"
                      src={cartItem.cover}
                      alt=""
                    />
                  </Box>
                  <Box flex={1} p="2">
                    <VStack align="start">
                      <Text>{cartItem.title}</Text>
                      <Text>Price :${cartItem.quantity * cartItem.price}</Text>
                      <Box>
                        <HStack>
                          <Button
                            disabled={cartItem.quantity === 1}
                            onClick={() => {
                              dispatch(decrement(cartItem.id));
                            }}
                          >
                            -
                          </Button>
                          <Text>{cartItem.quantity}</Text>
                          <Button
                            onClick={() => {
                              dispatch(increament(cartItem.id));
                            }}
                          >
                            +
                          </Button>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                </Flex>
              </React.Fragment>
            ))}
            <Box mt="2" textAlign="end">
              <Text fontWeight="bold">Total : ${totalPrice}</Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DashboardNavbar;
