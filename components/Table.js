import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th{
    text-align: left;
    text-transform: uppercase;
    color: #0D3D29;
    font-weight: 700;
    font-size: .7rem;
    //width: 33.33%;
  }
  td{
    border-top: 1px solid rgba(0,0,0,.1);
  }
`;

export default function Table(props) {
    return <StyledTable {...props} />
}