import Center from "@/components/Center";
import {signOut, signIn, useSession} from "next-auth/react";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import {RevealWrapper} from "next-reveal";
import Input from "@/components/Input";
import {useEffect, useState} from "react";
import Button from "@/components/Button";
import axios from "axios";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 40px 0;

  p {
    margin: 5px;
  }
`;

const ModWhiteBox = styled(WhiteBox)`
  padding: 30px;
`

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;
export default function Account() {
    const {data: session} = useSession();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loading, setLoading] = useState(true);

    async function logOut() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }

    async function logIn() {
        await signIn('google');
    }

    const handleNameChange = (ev) => {
        setName(ev.target.value);
        setNameError('');
    }

    const handleAddressChange = (ev) => {
        setAddress(ev.target.value);
        setAddressError('');
    }

    const handlePhoneChange = (ev) => {
        setPhone(ev.target.value);
        setPhoneError('');
    }

    function saveAddress() {
        const data = {name, address, phone};
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
            axios.put('/api/address', data);
        }
    }

    useEffect(() => {
        axios.get('/api/address');
    }, []);

    return (
        <>
            <Center>
                <ColsWrapper>
                    <div>
                        <RevealWrapper delay={0}>
                            <ModWhiteBox>
                                <h2>Yêu thích</h2>
                            </ModWhiteBox>
                        </RevealWrapper>
                    </div>
                    <div>
                        <RevealWrapper>
                            <ModWhiteBox>
                                <h2>Thông tin tài khoản</h2>
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
                                <Input
                                    type="text"
                                    placeholder='Email'
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                    name='email'
                                />
                                <Button
                                    black
                                    block
                                    onClick={saveAddress}
                                >
                                    Lưu
                                </Button>
                                <hr/>
                                {session && (
                                    <Button primary onClick={logOut}>Đăng xuất</Button>
                                )}
                                {!session && (
                                    <Button primary onClick={logIn}>Đăng nhập</Button>
                                )}
                            </ModWhiteBox>
                        </RevealWrapper>
                    </div>
                </ColsWrapper>
            </Center>
        </>
    )
}
