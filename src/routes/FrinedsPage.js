import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Mypost from '../components/Mypage/Mypost';
import { useStateValue } from '../StateProvider';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import db from '../firebase';
const useStyles = makeStyles((theme) => ({
    Edit: {
        width: '75px',
        height: '46px',
        border: '1px solid #FFFFFF',
        boxSizing: 'border-box',
        borderRadius: '25.5px',
        fontWeight: 'normal',
        fontSize: '24px',
        lineHeight: '35px',
        letterSpacing: '-0.48px',
        color: '#FFFFFF',
    },
}));
const Container = styled.div`
    position: relative;
    z-index: 1;
    margin-bottom: 14px;
    margin-top: -20px;
`;
const BackgroundImage = styled.div`
    width: 100%;
    height: 787px;
    background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 100) 0,
            rgba(25, 25, 25, 0) 20%,
            rgba(25, 25, 25, 0) 20%,
            rgba(0, 0, 0, 0) 66.66%,
            rgba(0, 0, 0, 0) 66.66%,
            rgba(0, 0, 0, 50) 100%
        ),
        url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`;
const Username = styled.p`
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;
    letter-spacing: -0.48px;
    margin-top: 12px;
    margin-bottom: 20px;
`;
const IntroductionFont = styled.p`
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;
    text-align: left;
    letter-spacing: -0.48px;
    color: #ffffff;
`;
function FriendsPage(props) {
    const [userinfo, setUserInfo] = useState('');

    const videoId = props.match.params.friendid; ///URL 에서 가져옴

    useEffect(() => {
        const videoId = props.match.params.friendid; ///URL 에서 가져옴
        db.collection('users')
            .doc(videoId)
            .get()
            .then((doc) => {
                setUserInfo(doc.data());
            });
    }, []);
    return (
        <div>
            <Container>
                <BackgroundImage bg={userinfo.background} />
            </Container>
            <div
                style={{
                    display: 'flex',
                    marginLeft: '10%',
                    marginTop: '-5%',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        width: '200px',
                        height: 'auto',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Avatar
                        src={userinfo.photoURL}
                        alt={''}
                        style={{
                            width: '200px',
                            height: '200px',
                            border: '2px solid #E44E47',
                            boxSizing: 'border-box',
                        }}
                    />
                    <Username>{userinfo.displayName}</Username>
                </div>
                <div
                    style={{
                        display: 'flex',
                        maxWidth: '380px',
                        alignItems: 'center',
                        marginLeft: '65px',
                    }}
                >
                    <div>
                        <IntroductionFont>내 소개</IntroductionFont>
                        <IntroductionFont
                            style={{
                                marginTop: '20px',
                                wordBreak: 'break-all',
                                fontWeight: '300',
                            }}
                        >
                            {userinfo.introduction}
                        </IntroductionFont>
                    </div>
                </div>
            </div>
            <Mypost
                displayName={userinfo.displayName}
                uid={userinfo.uid}
                videoId={videoId}
            />
        </div>
    );
}
export default FriendsPage;