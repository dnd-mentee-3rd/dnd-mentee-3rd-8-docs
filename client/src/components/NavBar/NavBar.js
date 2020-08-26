import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import UploadPage from '../Upload/UploadPage';

import styled from 'styled-components';

const Container = styled.header`
    position: relative;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 0;
`;

const Title = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    font-style: normal;
    font-weight: 900;
    font-size: 34px;
    line-height: 49px;
    color: #ff534b;
`;

const NavContainer = styled.nav`
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AreaContainer = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ListItem = styled.li`
    padding: 0 16px;
`;

const AreaLink = styled(Link)`
    text-decoration: none;
    color: #ffffff;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.36px;
    padding-bottom: 17px;

    &:hover {
        color: #ff534b;
        border-bottom: 2px solid #ff534b;
    }
`;

const Search = styled.div`
    width: 28px;
    height: 28px;
    cursor: pointer;
    background-image: url('/images/search.png');
    background-size: cover;
    background-position: center center;
`;

const UploadContainer = styled.div`
    width: 33px;
    height: 39px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const UploadIcon = styled.div`
    width: 20px;
    height: 20px;
    background-image: url('/images/upload.png');
    background-size: cover;
    background-position: center center;
    filter: invert(1);
`;

const UploadText = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -0.24px;
`;

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RegisterText = styled(Link)`
    text-decoration: none;
    padding: 15px;
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.28px;
    color: #ffffff;

    &:hover {
        color: #ff534b;
    }
`;

const Label = styled.label`
    padding: 15px;
    cursor: ${(props) => (props.logout ? 'pointer' : '')};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    lineheight: 20px;
    letter-spacing: -0.28px;

    &:hover {
        color: ${(props) => (props.logout ? '#ff534b' : '')};
    }
`;

export default () => {
    const [{ user }, dispatch] = useStateValue();
    const cityMenuList = [
        { name: '서울', to: '/area/seoul' },
        { name: '부산', to: '/area/busan' },
        { name: '대구', to: '/area/daegu' },
        { name: '인천', to: '/area/incheon' },
        { name: '광주', to: '/area/gwangju' },
        { name: '대전', to: '/area/daejeon' },
        { name: '울산', to: '/area/ulsan' },
        { name: '경기도', to: '/area/gyeonggi' },
        { name: '강원도', to: '/area/gangwondo' },
        { name: '충청도', to: '/area/chungcheong' },
        { name: '전라도', to: '/area/jeolla' },
        { name: '경상도', to: '/area/gyeongsang' },
        { name: '제주도', to: '/area/jeju' },
    ];

    useEffect(() => {
        setIsModalOpen(false);
    }, []);
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const onClose = () => {
        setIsModalOpen(false);
    };

    const logout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({
                    type: actionTypes.LOGOUT_USER,
                });
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <>
            <UploadPage open={IsModalOpen} close={onClose} />

            <Container>
                <Title to={'/'}>Traview</Title>
                <NavContainer>
                    <AreaContainer>
                        {cityMenuList.map((item, index) => (
                            <ListItem key={index}>
                                <AreaLink to={item.to}>{item.name}</AreaLink>
                            </ListItem>
                        ))}
                    </AreaContainer>
                </NavContainer>
                <Search />
                <UploadContainer
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                >
                    <UploadIcon />
                    <UploadText>업로드</UploadText>
                </UploadContainer>
                <RegisterContainer>
                    {!user ? (
                        <>
                            <RegisterText to={'/login'}>로그인</RegisterText>
                            <div>|</div>
                            <RegisterText to={'/register'}>
                                회원가입
                            </RegisterText>
                        </>
                    ) : (
                        <>
                            <Label>{user.displayName} 님</Label>
                            <div>|</div>
                            <Label onClick={logout} logout>
                                로그아웃
                            </Label>
                        </>
                    )}
                </RegisterContainer>
            </Container>
        </>
    );
};
