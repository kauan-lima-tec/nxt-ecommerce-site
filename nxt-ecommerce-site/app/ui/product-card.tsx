import Image from "next/image";
import Link from "next/link";

import { Product } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";

export default function ProductCard({ product } : { product: Product }) {
    return (
        <article className="bg-white shadow-sm border border-neutral-300">
            <div className="relative h-52 bg-neutral-300">
                <Image 
                    src={product.thumbnail}
                    alt={`${product.name} thumbnail`}
                    fill
                    style={{ objectFit: "contain", padding: "10px" }}
                    loading="eager"
                    sizes="
                        (max-width: 768px) 50vw,
                        (max-width: 1280px) 25vw,
                        20vw
                    "
                />
            </div>
            <div className="flex flex-col gap-4 p-3">
                <Link href={product.slug} className="line-clamp-2 text-sm">{product.name}</Link>
                <p>{formatCurrency(product.price)}</p>
            </div>
        </article>
    )
}