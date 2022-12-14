import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnimeCard from "../../components/AnimeCard";
import AnimeChart from "../../components/AnimeChart";
import httpClient from "../../utils/httpClient";
import { Anime } from "../../entities/entities";
import ClipLoader from "react-spinners/ClipLoader";

const Root = styled.div`
  background: ${(props) => props.theme.colors.primary};
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Container = styled.div`
  padding: 48px;
  @media screen and (max-width: 576px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const AnimeCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Home = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filter] = useState({
    limit: 20,
    page: 0,
    filter: "",
    type: "",
  });

  useEffect(() => {
    const getTopAnime = () => {
      const searchParams = new URLSearchParams({
        ...filter,
        limit: filter.limit.toString(),
        page: filter.page.toString(),
      });
      setIsLoading(true);
      httpClient
        .get(`/v4/top/anime?${searchParams}`)
        .then((res) => {
          const data: Anime[] = res.data.data;
          setAnimes(data);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getTopAnime();
  }, [filter]);

  return (
    <Root>
      <Container>
        {!isLoading ? (
          <>
            <AnimeCardContainer>
              {animes.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  rank={anime.rank}
                  title={anime.title}
                  imageCover={anime.images.jpg.image_url}
                  release={anime.aired.from}
                  lastest={anime.aired.to}
                  rating={anime.rating}
                />
              ))}
            </AnimeCardContainer>
            <AnimeChart data={animes} />
          </>
        ) : (
          <ClipLoader
            loading={isLoading}
            cssOverride={{
              display: "block",
              margin: "0 auto",
              borderColor: "red",
            }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </Container>
    </Root>
  );
};

export default Home;
