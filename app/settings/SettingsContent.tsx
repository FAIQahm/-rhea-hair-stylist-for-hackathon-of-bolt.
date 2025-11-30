'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Switch } from '@/components/ui/switch';
import { Bell, Shield } from 'lucide-react';

export default function SettingsContent() {
    const [notifications, setNotifications] = useState(true);
    const [dataSharing, setDataSharing] = useState(false);

    return (
        <div className="space-y-6">
            {/* Preferences */}
            <GlassCard className="p-6">
                <h2 className="text-lg font-bold text-white mb-6">Preferences</h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-white font-medium">Email Notifications</p>
                                <p className="text-xs text-gray-400">Receive weekly style digests</p>
                            </div>
                        </div>
                        <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-white font-medium">Data Sharing</p>
                                <p className="text-xs text-gray-400">Allow anonymous usage data for research</p>
                            </div>
                        </div>
                        <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
