import OrderForm from "./OrderForm"

export const metadata = {
  title: "4G Store",
  description: "Low on internet and you want to charge up a u-share bundle ? here is the right place, checkout our alfa ushare bundles, pick whatever you seem fit to your needs, and order it online on the spot !",
};
export default function Ushare() {
  return (
    <main>
        <h1>Order your bundle</h1>
        <OrderForm />
    </main>
  )
}
