import DashboardContent from '@/Components/Dashboard';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, history }) {
    return (
        <>
            <Head title="Dashboard" />
            <DashboardContent auth={auth} history={history} />
        </>
    );
}
