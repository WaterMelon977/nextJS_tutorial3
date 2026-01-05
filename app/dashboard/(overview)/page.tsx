import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';

export default async function Page() {

    /*  request waterfall.
      we need to wait for fetchRevenue() to execute before fetchLatestInvoices() can start running, and so on.*/
    // With dynamic rendering, your application is only as fast as your slowest data fetch.
    // const revenue = await fetchRevenue();
    const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();



    /*  Parallel data fetching
    A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.
    In JavaScript, you can use the Promise.all() or Promise.allSettled() functions to initiate all promises 
    at the same time. For example, in data.ts, we're using Promise.all() in the fetchCardData() function:


    there is one disadvantage of relying only on this JavaScript pattern: what happens if one data request 
    is slower than all the others? Let's find out more in the next chapter.
    */


    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
                <Card title="Pending" value={totalPendingInvoices} type="pending" />
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                <Card
                    title="Total Customers"
                    value={numberOfCustomers}
                    type="customers"
                /> */}

                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>


            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <RevenueChart revenue={revenue} /> */}
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>

            </div>
        </main>
    );
}