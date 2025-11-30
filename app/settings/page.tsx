import InfoPageLayout from '@/components/InfoPageLayout';
import SettingsContent from './SettingsContent';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default function SettingsPage() {
    return (
        <InfoPageLayout title="Settings">
            <SettingsContent />
        </InfoPageLayout>
    );
}
