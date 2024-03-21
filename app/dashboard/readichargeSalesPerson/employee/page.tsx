import PaymentData from "../../skeleton/paymentTable/page";

const breadcrumbItems = [{ title: "Payment", link: "/dashboard/employee" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {

  return (
    <>
        <PaymentData breadcrumbItems={breadcrumbItems} rowData={[]} />
    </>
  );
}
