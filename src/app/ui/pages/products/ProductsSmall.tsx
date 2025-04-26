import React from "react";
import "./Products.css";
import "../../components/liteGrid@v1.0/lite-grid.css";
import ProductCard from "../../components/productcard/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { RoutePaths } from "../../../routes/Index";

const ProductsSmall: React.FC = () => {
    const projects = useSelector((state: RootState) => state.projects.projects);

    return (
        <section className="product_sec">
            <div className="wrapper">
                <div className="product_title">
                    <span
                        className="title_span"
                        style={{ background: "#242627", color: "#efecfe" }}
                    >
                        OUR PROJECTS
                    </span>
                </div>
                <h1>Our Innovations and Projects</h1>
                <p>
                    We transform ideas into reality through groundbreaking projects that blend technology, creativity, and innovation. From AI-driven solutions to dynamic web platforms and immersive animations, every project reflects our commitment to excellence, forward-thinking design, and real-world impact.
                </p>
                <div className="group">
                    {projects.slice(0, 3).map((product, index) => (
                        <div key={index} className="block-12 block-md-4">
                            <ProductCard
                                imageUrl={product.imageUrl}
                                category={product.category}
                                price={product.price}
                                title={product.title}
                                author={product.author}
                                descriptionUrl={product.summary}
                                summary={product.summary}
                                startDate=""
                                client=""
                                team={[]}
                            />
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
                    <a
                        href={RoutePaths.Products}
                        style={{ backgroundColor: "#fff", color: "#071d6a" }}
                        className="navbar-cta"
                    >
                        See all Projects
                    </a>
                </div>
            </div>
            <br />
            <br />
            <br />
        </section>
    );
};

export default ProductsSmall;