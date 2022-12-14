import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

interface CardProps {
  expand: boolean;
}

interface CardBodyProps {
  expand: boolean;
}

interface DetailsContainerProps {
  show: boolean;
}

const Container = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
`;

const Card = styled.div<CardProps>`
  z-index: ${(props) => (props.expand ? "1" : "0")};
  width: ${(props) => (props.expand ? "300px" : "200px")};
  height: ${(props) => (props.expand ? "420px" : "300px")};
  transition: 0.2s all;
  display: flex;
  flex-direction: column;
  position: ${(props) => (props.expand ? "absolute" : "relative")};

  left: ${(props) => (props.expand ? "50%" : "0")};
  transform: ${(props) => (props.expand ? "translateX(-50%)" : "0")};
  background: ${(props) => props.theme.colors.white};
  min-width: 0;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border-radius: 12px;
`;

const CardHeader = styled.div`
  position: relative;
  height: 250px;
`;

const CardBody = styled.div<CardBodyProps>`
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: ${(props) => (props.expand ? "8px 12px" : "8px 6px")};

  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 0px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Image = styled.img`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Tag = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  border-top-right-radius: 12px;
  padding: 6px 10px;
  font-weight: bold;
  white-space: nowrap;
  text-align: center;
  background: ${(props) => props.theme.colors.secondary};
`;

const DetailsContainer = styled.div<DetailsContainerProps>`
  opacity: ${(props) => (props.show ? 1 : 0)};
  display: flex;
  transition-delay: ${(props) => (props.show ? "0.1s" : "0s")};
  margin-bottom: 8px;
  flex-direction: column;
  row-gap: 16px;
`;

const DetailsTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
`;

const DetailsDescription = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-left: 4px;
  font-weight: 400;
  white-space: nowrap;
`;

const DetailsInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

interface IProps {
  rank: number;
  imageCover: string;
  title: string;
  release: Date;
  lastest: string | Date;
  rating: string;
}

const AnimeCard = (props: IProps) => {
  const { rank, imageCover, title, release, lastest, rating } = props;
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <Container>
      <Card
        expand={showDetails}
        onMouseDown={() => {
          setShowDetails(true);
        }}
        onMouseUp={() => {
          setShowDetails(false);
        }}
      >
        <CardHeader>
          <Image src={imageCover} alt={title} />
          <Tag>{rank}</Tag>
        </CardHeader>
        <CardBody expand={showDetails}>
          <Title>{title}</Title>
          <DetailsContainer show={showDetails}>
            <DetailsInnerContainer>
              <DetailsTitle>Release :</DetailsTitle>
              <DetailsDescription>
                {moment(release).format("ddd MMM D YYYY")}
              </DetailsDescription>
            </DetailsInnerContainer>
            <DetailsInnerContainer>
              <DetailsTitle>Lastest :</DetailsTitle>
              <DetailsDescription>
                {typeof lastest === "object" && lastest
                  ? moment(lastest).format("ddd MMM D YYYY")
                  : "now"}
              </DetailsDescription>
            </DetailsInnerContainer>
            <DetailsInnerContainer>
              <DetailsTitle>Rating :</DetailsTitle>
              <DetailsDescription>{rating}</DetailsDescription>
            </DetailsInnerContainer>
          </DetailsContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AnimeCard;
