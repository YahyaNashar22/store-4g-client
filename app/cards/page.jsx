import CardOrderForm from "./CardOrderForm"


export const metadata = {
  title: "4G Store",
  description: "Need to recharge your mobile? checkout our collection of recharge cards for both alfa and mtc and order your recharge card online",
};
export default function Cards() {
  return (
    <main>
      <h1>Order Your Card</h1>
      <CardOrderForm />
    </main>
  )
}
