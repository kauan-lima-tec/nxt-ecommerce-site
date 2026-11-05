import { products } from "@/app/lib/placeholder-data";
import ProductCard from "@/app/ui/product-card";

export default function Home() {
	return (
		<main>
			<section className="m-2 md:m-4 xl:mx-40">
				<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section>
		</main>
	)
}