import Button from './Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #fff;
  max-width: 240px;
  border-radius: 4px;
  position: relative;
  margin-bottom: 24px;
  transition: box-shadow 0.35s ease-in-out;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  }
  @media (max-width: 600px) {
    max-width: 180px;
  }
`;

const Link = styled.a`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  img {
    height: 175px;
  }
`;

const Title = styled.h2`
  font-size: 13px;
  text-align: left;
  margin-top: 6px;
  margin-left: 15px;
  font-weight: bold;
  line-height: 18px;
  color: #3e4145;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 0px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Offer = styled.div`
  position: relative;
  text-decoration: none;
  text-align: left;
  color: #3e4145;
  display: block;
  margin: 10px 15px 3px 16px;
  padding: 3px 16px 3px 0px;
  border-radius: 4px;
  transition: all 0.3s ease 0s;

  a {
    text-decoration: none;
    display: block;

    .tag {
      width: 100%;
      height: 15px;
      font-size: 11px;
      font-weight: 600;
      text-align: left;
      margin-right: 10px;
      color: #4990e2;
    }

    .price {
      font-size: 15px;
      font-weight: bold;
      color: #3e4145;
    }
  }

  &:hover {
    padding-left: 10px;
    background: #f5f5f5;
  }

  &:after {
    content: '';
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12"%3E%3Cg fill="none" fill-rule="evenodd" transform="translate(-17 -14)"%3E%3Crect width="40" height="40" rx="4"%3E%3C/rect%3E%3Cpath fill="%234A90E2" fill-rule="nonzero" d="M24 20c0 .225-.091.44-.252.597l-5.355 5.172a.823.823 0 0 1-1.164-.023.832.832 0 0 1 .023-1.17L21.988 20l-4.736-4.576a.832.832 0 0 1-.023-1.17.82.82 0 0 1 1.164-.023l5.355 5.173c.16.156.252.371.252.596z"%3E%3C/path%3E%3C/g%3E%3C/svg%3E');
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    position: absolute;
    top: 40%;
    right: 10px;
    color: #4990e2;
    font-weight: bold;
    cursor: pointer;
  }
`;

function ProductCard(props) {
  return (
    <Wrapper>
      <article>
        <Link href={props.link} title={props.title}></Link>
        <ImageWrapper>
          <img src={props.image} alt={props.title} />
        </ImageWrapper>
        <Title>{props.title}</Title>
        <Offer>
          <a href={props.topofferlink}>
            <div className='tag'>{props.topoffer}</div>
            <div className='price'>{props.topofferprice} TL</div>
          </a>
        </Offer>
        <Offer>
          <a href={props.topofferlink}>
            <div className='tag'>{props.topsecondoffer}</div>
            <div className='price'>{props.topsecondofferprice} TL</div>
          </a>
        </Offer>
        <Button title='Tümünü İncele' link={props.link} />
      </article>
    </Wrapper>
  );
}

export default ProductCard;
