import React, { useState } from 'react';
import styled from 'styled-components';
import DetailPage from '../Detail/DetailPage';

const LeftBottomContainer = styled.div`
    position: absolute;
    left: 12px;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    visibility: hidden;
`;

const RightBottomContainer = styled.div`
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    visibility: hidden;
`;

const RightTopContainer = styled.div`
    position: absolute;
    top: 15px;
    right: 12px;
    display: flex;
    align-items: center;
    visibility: hidden;
`;

const Image = styled.img`
    width: 100%;
    border-radius: 20px;
`;

const Box = styled.div`
    width: 100%;
    margin: 0 0 45px;
    overflow: hidden;
    break-inside: avoid;
    cursor: pointer;
`;

const ImageTitle = styled.h2`
    margin: 8px 0 0;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 35px;
    letter-spacing: -0.48px;
`;

const Description = styled.p`
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: -0.32px;
`;

const ImageContainer = styled.div`
    position: relative;

    &: hover {
        ${LeftBottomContainer} {
            visibility: visible;
        }
        ${RightBottomContainer} {
            visibility: visible;
        }
        ${RightTopContainer} {
            visibility: visible;
        }
        ${Image} {
            opacity: 0.6;
            transition: opacity 300ms ease-out;
        }
    }
`;

const TextBox = styled.label`
    font-size: 16px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: -0.32px;
`;

export default ({
    advertising,
    area,
    avatar,
    heart,
    imageUrl,
    latitude,
    longitude,
    mood,
    novelty,
    rating,
    review,
    timestamp,
    title,
    username,
    address,
    id,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <DetailPage
                open={isModalOpen}
                close={onClose}
                id={id}
                advertising={advertising}
                area={area}
                avatar={avatar}
                heart={heart}
                imageUrl={imageUrl}
                latitude={latitude}
                longitude={longitude}
                mood={mood}
                novelty={novelty}
                rating={rating}
                review={review}
                timestamp={timestamp}
                title={title}
                username={username}
                address={address}
            />
            <Box onClick={() => setIsModalOpen(true)}>
                <ImageContainer>
                    <Image src={imageUrl} alt="" />
                    <LeftBottomContainer>
                        <img
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '22px',
                                objectFit: 'cover',
                                marginBottom: '3px',
                            }}
                            src={avatar}
                            alt=""
                        />
                        <TextBox>{username}</TextBox>
                    </LeftBottomContainer>
                    <RightTopContainer>
                        <img
                            style={{ marginRight: '4px' }}
                            src="/images/Interesting.png"
                            alt=""
                        />
                        <TextBox>{novelty}</TextBox>
                        <img
                            style={{ marginRight: '4px', marginLeft: '14px' }}
                            src="/images/like.png"
                            alt=""
                        />
                        <TextBox>{heart}</TextBox>
                    </RightTopContainer>
                    <RightBottomContainer>
                        <img
                            style={{ marginRight: '4px' }}
                            src="/images/location.png"
                            alt=""
                        />
                        <TextBox>{area}</TextBox>
                    </RightBottomContainer>
                </ImageContainer>
                <ImageTitle>{title}</ImageTitle>
                <Description>{review?.slice(0, 20)}...</Description>
            </Box>
        </>
    );
};