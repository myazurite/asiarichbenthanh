import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import ProductBox from "@/components/ProductBox";
import { StyledProductsGrid } from "@/components/ProductsGrid";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product, similarProducts }) {
    const { addProduct } = useContext(CartContext);
    function formatNumber(num) {
        return new Intl.NumberFormat('de-DE').format(num);
    }

    return (
        <>
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <Price>
                            {Object.entries(product.properties).map(([key, value]) => (
                                <p key={key}>
                                    <strong>{key}: </strong> {value}
                                </p>
                            ))}
                        </Price>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>{formatNumber(product.price)} ₫</Price>
                            </div>
                            <div>
                                <Button primary onClick={() => addProduct(product._id)}>
                                    <CartIcon />Thêm vào giỏ hàng
                                </Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>

                {/* Display similar products */}
                <div>
                    <h2>Sản phẩm cùng loại</h2>
                    <StyledProductsGrid>
                        {similarProducts.map(similarProduct => (
                            <ProductBox
                                key={similarProduct._id}
                                _id={similarProduct._id}
                                title={similarProduct.title}
                                price={similarProduct.price}
                                images={similarProduct.images}
                                showBuyButton={true}
                            />
                        ))}
                    </StyledProductsGrid>
                </div>
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id);

    // Get additional products from the same category
    const similarProducts = await Product.aggregate([
        { $match: { category: product.category } },
        { $sample: { size: 4 } }
    ]);

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            similarProducts: JSON.parse(JSON.stringify(similarProducts)),
        }
    }
}
