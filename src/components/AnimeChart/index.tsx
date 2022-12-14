import { useEffect, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { uniqWith, sortBy } from "lodash";
import styled from "styled-components";
import { Anime } from "../../entities/entities";

interface IProps {
  data: Anime[];
}

interface DataAnime {
  name: number;
  title: string[];
  amount: number;
}

const Container = styled.div`
  max-width: 1280px;
  margin: 40px auto 0px;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  background: ${(props) => props.theme.colors.white};
  border: 2px solid ${(props) => props.theme.colors.red};

  border-radius: 8px;
  padding: 16px;
`;

const Date = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

const Title = styled.div`
  text-align: center;
  font-size: 16px;
`;

const AnimeChart = (props: IProps) => {
  const { data } = props;

  const [animes, setAnimes] = useState<DataAnime[]>([]);

  const renderContent = (props: any) => {
    if (props && props?.payload[0]?.payload?.title) {
      return (
        <ContentContainer>
          <Date>{props?.payload[0]?.payload?.name}</Date>
          {props?.payload[0]?.payload?.title?.map((title: string) => (
            <Title key={title}>{title}</Title>
          ))}
        </ContentContainer>
      );
    }
  };

  useEffect(() => {
    const mergedAnimes = uniqWith(data, (pre, cur) => {
      if (pre.aired.prop.from.year === cur.aired.prop.from.year) {
        cur.title = cur.title + "," + pre.title;
        return true;
      }
      return false;
    });

    const stateAnimes: DataAnime[] = mergedAnimes.map((anime) => {
      const _title = anime.title.split(",");
      return {
        name: anime.aired.prop.from.year,
        title: _title,
        amount: _title.length,
      };
    });

    setAnimes(sortBy(stateAnimes, ["name"], ["asc"]));
  }, [data]);

  return (
    <Container>
      <ResponsiveContainer width="95%" height={400}>
        <AreaChart style={{ width: "100%" }} data={animes}>
          <defs>
            <linearGradient
              id="colorAmount"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientTransform="rotate(270)"
              spreadMethod="pad"
            >
              <stop offset="5%" stopColor="#7deda5" stopOpacity={1} />
              <stop offset="95%" stopColor="#b1aedb" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="1 0" />
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            cursor={false}
            content={renderContent}
          />
          <Area
            type="monotone"
            dataKey="amount"
            strokeWidth={2}
            stroke="#8bafc0"
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default AnimeChart;
