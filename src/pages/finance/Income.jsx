import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Wallet } from 'lucide-react';
import { getIncomes, createIncome, deleteIncome } from '../../api/income.api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { INCOME_SOURCES } from '../../utils/constants';
import toast from 'react-hot-toast';

const Income = () => {
    const [incomes, setIncomes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        source: '',
        incomeDate: new Date().toISOString().split('T')[0],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchIncomes();
    }, []);

    const fetchIncomes = async () => {
        try {
            const data = await getIncomes();
            setIncomes(data);
        } catch (error) {
            toast.error('Failed to fetch incomes');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createIncome(formData);
            toast.success('Income added successfully!');
            setShowModal(false);
            setFormData({ amount: '', source: '', incomeDate: new Date().toISOString().split('T')[0] });
            fetchIncomes();
        } catch (error) {
            toast.error('Failed to add income');
        } finally {
            setLoading(false);
        }
    };
    console.log("INCOMES =>", incomes);


    // const handleDelete = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this income?')) {
    //         try {
    //             await deleteIncome(id);
    //             toast.success('Income deleted successfully!');
    //             fetchIncomes();
    //         } catch (error) {
    //             toast.error('Failed to delete income');
    //         }
    //     }
    // };
    const handleDelete = async (id) => {

        if (!id) {
            toast.error("Income ID missing");
            return;
        }

        if (window.confirm('Are you sure you want to delete this income?')) {
            try {
                await deleteIncome(id);
                toast.success('Income deleted successfully!');
                fetchIncomes();
            } catch (error) {
                toast.error('Failed to delete income');
            }
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-dark-100 mb-2">
                        Income Management
                    </h1>
                    <p className="text-dark-400">Track all your income sources</p>
                </div>
                <Button onClick={() => setShowModal(true)} icon={Plus}>
                    Add Income

                </Button>
            </div>

            {/* Income List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {incomes.map((income) => (
                    <Card key={income.incomeId} hover>
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-accent-500/10 rounded-xl">
                                <Wallet className="w-6 h-6 text-accent-400" />
                            </div>
                            <button
                                onClick={() => handleDelete(income.incomeId)}
                                className="text-danger-400 hover:text-danger-300 text-sm"
                            >
                                Delete
                            </button>
                        </div>

                        <h3 className="text-dark-400 text-sm mb-1">{income.source}</h3>
                        <p className="text-2xl font-bold text-dark-100 mb-2">
                            {formatCurrency(income.amount)}
                        </p>
                        <p className="text-xs text-dark-500">
                            {formatDate(income.incomeDate)}
                        </p>
                    </Card>
                ))}
            </div>

            {/* Add Income Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Income">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Amount"
                        type="number"
                        placeholder="50000"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">
                            Source
                        </label>
                        <select
                            className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-ai-500"
                            value={formData.source}
                            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                            required
                        >
                            <option value="">Select source</option>
                            {INCOME_SOURCES.map((source) => (
                                <option key={source} value={source}>
                                    {source}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Date"
                        type="date"
                        value={formData.incomeDate}
                        onChange={(e) => setFormData({ ...formData, incomeDate: e.target.value })}
                        required
                    />

                    <Button type="submit" loading={loading} className="w-full">
                        Add Income
                    </Button>
                </form>
            </Modal>
        </motion.div>
    );
};

export default Income;