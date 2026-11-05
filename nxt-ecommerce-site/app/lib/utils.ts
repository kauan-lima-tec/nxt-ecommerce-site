export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    })
}