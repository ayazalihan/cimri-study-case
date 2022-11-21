import styled from 'styled-components';

const Link = styled.a`
  display: inline-block;
  text-decoration: none;
  font-size: 13px;
  text-align: center;
  margin: 5px 15px 15px;
  border-radius: 4px;
  color: #ffffff;
  background-color: #4990e2;
  padding: 5px 20px;
  font-weight: 700;
`;

function Button(props) {
  return (
    <Link href={props.link} title={props.title}>
      {props.title}
    </Link>
  );
}

export default Button;
