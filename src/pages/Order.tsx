import React from "react";
import { SidebarLink } from "../components/SidebarLink";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

const Order: React.FC = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);  // Updates the tab state to the selected value
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-56 space-y-3 mb-6 md:mb-0">
                <SidebarLink />
            </aside>

            <main className="flex-1">
                <h1 className="text-2xl font-semibold mb-6">Danh sách đơn hàng</h1>
                <Box sx={{ width: '100%' }}>
                    {/* Tabs component for switching */}
                    <Tabs value={value} onChange={handleChange} aria-label="Order Tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tab label="Chờ xử lý" value="1" />
                        <Tab label="Đang giao hàng" value="2" />
                        <Tab label="Đã giao hàng" value="3" />
                        <Tab label="Thành công" value="4" />
                        <Tab label="Đã hủy" value="5" />
                    </Tabs>

                    {/* Tab Panels */}
                    <TabPanel value={value} index="1">
                        <Typography variant="h6">Item One</Typography>
                        <p>This is the content for item one.</p>
                    </TabPanel>
                    <TabPanel value={value} index="2">
                        <Typography variant="h6">Item Two</Typography>
                        <p>This is the content for item two.</p>
                    </TabPanel>
                    <TabPanel value={value} index="3">
                        <Typography variant="h6">Item Three</Typography>
                        <p>This is the content for item three.</p>
                    </TabPanel>
                     <TabPanel value={value} index="4">
                        <Typography variant="h6">Item Three</Typography>
                        <p>This is the content for item three.</p>
                    </TabPanel>
                     <TabPanel value={value} index="5">
                        <Typography variant="h6">Item Three</Typography>
                        <p>This is the content for item three.</p>
                    </TabPanel>
                </Box>
            </main>
        </div>
    );
};

interface TabPanelProps {
    value: string;
    index: string;
    children: React.ReactNode;
}

const TabPanel = (props: TabPanelProps) => {
    const { value, index, children } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

export default Order;
