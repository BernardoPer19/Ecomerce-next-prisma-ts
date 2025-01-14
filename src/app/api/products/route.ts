import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

// GET para obtener todos los productos
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al obtener los productos." },
      { status: 500 }
    );
  }
}

// POST para crear un nuevo producto
export async function POST(request: Request) {
  try {
    const { name, description, img, price } = await request.json();

    // Validación del campo 'name'
    if (!name) {
      return NextResponse.json(
        { error: "El campo 'name' es obligatorio." },
        { status: 400 }
      );
    }

    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      return NextResponse.json(
        { error: "El campo 'price' debe ser un número válido mayor a 0." },
        { status: 400 }
      );
    }

    const newProd = await prisma.product.create({
      data: {
        name,
        description,
        img,
        price,
      },
    });

    return NextResponse.json(newProd);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);

    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
