import {
  Box,
  Button,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { fetchProducts } from "../../store/productsSlice";

const CardComponentItem = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <SimpleGrid columns={4}>
      {products.list.map((product) => (
        <>
          <GridItem mt="20">
            <Box
              role={"group"}
              p={6}
              maxW={"330px"}
              w={"full"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
            >
              <Box
                rounded={"lg"}
                mt={-12}
                pos={"relative"}
                height={"230px"}
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${product.cover})`,
                  filter: "blur(15px)",
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: "blur(20px)",
                  },
                }}
              >
                <Image
                  rounded={"lg"}
                  height={230}
                  width={282}
                  objectFit={"cover"}
                  src={product.cover}
                  alt=""
                />
              </Box>
              <Stack pt={10} align={"center"}>
                <Text
                  color={"gray.500"}
                  fontSize={"sm"}
                  textTransform={"uppercase"}
                >
                  Brand
                </Text>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                  {product.title}
                </Heading>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={800} fontSize={"xl"}>
                    {product.currency}
                    {product.price}
                  </Text>
                </Stack>
                <Stack direction={"row"} align={"center"}>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => {
                      dispatch(addToCart(product));
                    }}
                  >
                    Buy Now
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </GridItem>
        </>
      ))}
    </SimpleGrid>
  );
};

export default CardComponentItem;
