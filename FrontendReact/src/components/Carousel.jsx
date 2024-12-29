import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import styled from "styled-components";
import moviesData from "../data/moviesData";

const CarouselWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
`;

const CardsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 900px; /* Migliorato per supportare 3 immagini visibili */
  height: 350px;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 250px;
  }
`;

const Card = styled(animated.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  width: 250px;
  height: 350px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  @media (max-width: 768px) {
    width: 200px;
    height: 250px;
  }
`;

const getDataFromIndex = (data, initialIndex) => {
    const result = [];
    let index = initialIndex;
    for (let i = 0; i < data.length; i++) {
        if (index >= data.length) index = 0;
        result.push(data[index]);
        if (result.length === 3) break;
        index++;
    }
    return result;
};

const CARD_WIDTH = 250; // Larghezza di ogni card
const GAP = 15; // Spazio tra le card
const X_TRANSITION = CARD_WIDTH + GAP; // Transizione orizzontale

function Carousel() {
    const [data, setData] = useState(getDataFromIndex(moviesData, 0));

    useEffect(() => {
        let index = 1;
        const interval = setInterval(() => {
            setData(getDataFromIndex(moviesData, index));
            index++;
            if (index >= moviesData.length) index = 0;
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const transitions = useTransition(
        data.map((item, i) => ({
            ...item,
            x: i * X_TRANSITION - X_TRANSITION, // Posiziona l'immagine centrale
            scale: i !== 1 ? 0.8 : 1,
        })),
        {
            from: ({ x }) => ({ x: x + X_TRANSITION, opacity: 0, scale: 0.6 }),
            enter: ({ x, scale }) => ({ x, opacity: 1, scale }),
            leave: ({ x }) => ({ x: x - X_TRANSITION, opacity: 0, scale: 0.6 }),
            update: ({ x, scale }) => ({ x, scale }),
            keys: ({ id }) => id,
        }
    );

    return (
        <CarouselWrapper>
            <CardsContainer>
                {transitions((style, item) => (
                    <Card
                        style={{
                            backgroundImage: `url(${item.poster})`,
                            ...style,
                        }}
                    />
                ))}
            </CardsContainer>
        </CarouselWrapper>
    );
}

export default Carousel;
