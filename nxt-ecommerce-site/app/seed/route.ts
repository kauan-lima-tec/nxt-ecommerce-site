import { products } from "@/app/lib/placeholder-data";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedProducts() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
        CREATE TABLE IF NOT EXISTS products (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL, 
            price INTEGER NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL
        );
    `;

    const insertedProducts = await Promise.all(
        products.map(
            (product) => sql`
                INSERT INTO products (id, name, price, thumbnail, slug)
                VALUES (${product.id}, ${product.name}, ${product.price}, ${product.thumbnail}, ${product.slug})
                ON CONFLICT (id) DO NOTHING;
            `,
        ),
    );

    return insertedProducts;
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            seedProducts(),
        ]);

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}