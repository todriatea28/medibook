import StatCard from '../../components/StatCard/StatCard';

export default function Overview() {
  return (
    <section className="stats-grid">
      <StatCard title="მთლიანი შემოსავალი" value="₾12,450" change="დემო მონაცემი" />
      <StatCard title="აქტიური პაციენტები" value="1,240" change="დემო მონაცემი" />
      <StatCard title="დღიური ჯავშნები" value="36" change="დემო მონაცემი" />
    </section>
  );
}