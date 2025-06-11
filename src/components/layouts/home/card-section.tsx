import HomeCard from "./home-card";

const CardSection = () => {
  const cards = [
    {
      id: 1,
      title: "Bills Tracked",
      value: 1250
    },
    {
      id: 2,
      title: "Youth Engaged",
      value: 8570
    },
    {
      id: 3,
      title: "Active Discussion",
      value: 350
    },
    {
      id: 4,
      title: "Legislative rating",
      value: 120
    },
  ]
  
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {cards.map((item) => (
        <HomeCard
          key={item.id}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  )
}

export default CardSection;