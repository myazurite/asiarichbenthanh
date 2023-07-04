import Center from "@/components/Center";
import Title from "@/components/Title";
import {signOut,signIn, useSession} from "next-auth/react";
import {Button} from "@mui/material";
import styled from "styled-components";

const ColsWrapper = styled.div`
  display:grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 40px 0;
  p{
    margin:5px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;
export default function Account() {
    const {data: session} = useSession()

    async function logOut() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }

    async function logIn() {
        await signIn('google');
    }

    return (
        <>
            <Center>
                <Title>
                    Tài khoản
                </Title>
                {session && (
                    <Button primary onClick={logOut}>Đăng xuất</Button>
                )}
                {!session && (
                    <Button primary onClick={logIn}>Đăng nhập</Button>
                )}
            </Center>
        </>
    )
}
