import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';

export const BorderCol = styled(Col)`
  border: 1px solid grey;
  border-radius: 3px;
  padding: 10px;
`;

export const TallBorderCol = styled(BorderCol)`
  border: 1px solid grey;
  border-radius: 3px;
  padding: 10px;
  min-height: 600px;
`;

export const ScrollingContainer = styled(Container)`
    height: ${props => props.height || "600px"};
    overflow-y:scroll;
    overflow-x:hidden;
    border: 1px solid grey;
`;

export const ScrollingBorderlessContainer = styled(Container)`
  height: ${props => props.height || "300px"};
  overflow-y:scroll;
  overflow-x:hidden;
`;

export const RightJustifiedButton = styled(Button)`
    float: right;
    margin-left: 2px;
`;

export const ChartCard = styled(Card)`
  min-height: ${props => props.minHeight || "200px"};
  border: 1px solid grey;
  border-radius: 3px;
  padding: 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const ClickableBadge = styled(Badge)`
  cursor: pointer;
`;

export const ClickableCard = styled(Card)`
  cursor: ${props => props.cursor || "pointer"};
  border-width: 2px;
`;

export const CenteredSpinner = styled(Spinner)`
  z-index: 1
`;
