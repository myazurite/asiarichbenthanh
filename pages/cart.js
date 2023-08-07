import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import {useRouter} from "next/router";
import {Skeleton} from "@mui/material"

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  span {
    color: #696969;
  }
`;

const OrderBtn = styled(Button)`
  background: #F0E68C;
  color: #0D3D29;
`

const ProductImageBox = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 70px;
    max-height: 70px;
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) {
    img {
      max-width: 100px;
      max-height: 100px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const SkeletonRow = styled(Skeleton)`
  height: 70px;
  width: 100%;
  margin-bottom: 10px;
`;

export default function CartPage() {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleNameChange = (ev) => {
        setName(ev.target.value);
        setNameError(''); // Clear error message
    }

    const handleAddressChange = (ev) => {
        setAddress(ev.target.value);
        setAddressError(''); // Clear error message
    }

    const handlePhoneChange = (ev) => {
        setPhone(ev.target.value);
        setPhoneError(''); // Clear error message
    }

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {ids: cartProducts})
                .then(response => {
                    setProducts(response.data);
                });
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    async function goToPayment() {
        let isValid = true;
        if (!name) {
            setNameError('Tên không thể bỏ trống.');
            isValid = false;
        }
        if (!address) {
            setAddressError('Địa chỉ không thể bỏ trống.');
            isValid = false;
        }
        if (!phone) {
            setPhoneError('Số điện thoại không thể bỏ trống.');
            isValid = false;
        }

        if (isValid) {
            const response = await axios.post('/api/checkout', {
                name, phone, address, cartProducts
            });
            if (response.data.url) {
                clearCart();
                window.location.href = response.data.url;
            }
        }
    }

    let total = 0;

    function getProductPrice(product) {
        return product.discount > 0 ? product.discountedPrice : product.price;
    }

    const uniqueCartProducts = new Set(cartProducts);
    for (const productId of uniqueCartProducts) {
        const product = products.find(p => p._id === productId);
        if (product) {
            total += getProductPrice(product) * cartProducts.filter(id => id === productId).length;
        }
    }

    function formatNumber(num) {
        return new Intl.NumberFormat('de-DE').format(num);
    }

    useEffect(() => {
        setLoading(true);
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {ids: cartProducts})
                .then(response => {
                    setProducts(response.data);
                    setLoading(false);
                });
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, []);

    if (router.isReady && router.asPath.includes('success')) {
        return (
            <>
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Cảm ơn bạn đã đặt hàng!</h1>
                            <p>Chúng tôi sẽ liên lạc khi đơn hàng của bạn được gửi.</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        )
    }

    return (
        <>
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>GIỎ HÀNG</h2>
                        {loading ? (
                            <>
                                <SkeletonRow variant="text"/>
                                <SkeletonRow variant="text"/>
                                <SkeletonRow variant="text"/>
                                <SkeletonRow variant="text"/>
                                <SkeletonRow variant="text"/>
                            </>
                        ) : (
                            (!cartProducts?.length && (
                                <div>Giỏ hàng trống</div>
                            )) || (products?.length > 0 && (
                                <Table>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Giá</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {products.map(product => (
                                            <tr key={product.id}>
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <img src={product.images[0]} alt=""/>
                                                    </ProductImageBox>
                                                    <span>{product.title}</span>
                                                </ProductInfoCell>
                                                <td>
                                                    <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                    <QuantityLabel>
                                                        {cartProducts.filter(id => id === product._id).length}
                                                    </QuantityLabel>
                                                    <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                                </td>
                                                <td>{formatNumber(cartProducts.filter(id => id === product._id).length * getProductPrice(product))} ₫</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>{formatNumber(total)} ₫</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Table>
                            ))
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>THÔNG TIN ĐẶT HÀNG</h2>
                            <Input
                                type="text"
                                placeholder='Tên'
                                value={name}
                                onChange={handleNameChange}
                                name='name'
                                required
                            />
                            {nameError && <span style={{color: 'red'}}>{nameError}</span>}
                            <Input
                                type="tel"
                                placeholder='Số điện thoại'
                                value={phone}
                                onChange={handlePhoneChange}
                                name='phone'
                                required
                            />
                            {phoneError && <span style={{color: 'red'}}>{phoneError}</span>}
                            <Input
                                type="text"
                                placeholder='Địa chỉ'
                                value={address}
                                onChange={handleAddressChange}
                                name='address'
                                required
                            />
                            {addressError && <span style={{color: 'red'}}>{addressError}</span>}
                            <OrderBtn
                                block
                                onClick={goToPayment}
                            >
                                Đặt hàng
                            </OrderBtn>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    )
}
