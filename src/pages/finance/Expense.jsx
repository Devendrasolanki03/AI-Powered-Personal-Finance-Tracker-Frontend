import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, CreditCard } from 'lucide-react';
import { getExpenses, createExpense, deleteExpense } from '../../api/expense.api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { EXPENSE_CATEGORIES } from '../../utils/constants';
import toast from 'react-hot-toast';

const Expense = () => {
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        categoryId: '',
        description: '',
        expenseDate: new Date().toISOString().split('T')[0],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (error) {
            toast.error('Failed to fetch expenses');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createExpense(formData);
            toast.success('Expense added successfully!');
            setShowModal(false);
            setFormData({
                amount: '',
                categoryId: '',
                description: '',
                expenseDate: new Date().toISOString().split('T')[0],
            });
            fetchExpenses();
        } catch (error) {
            toast.error('Failed to add expense');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await deleteExpense(id);
                toast.success('Expense deleted successfully!');
                fetchExpenses();
            } catch (error) {
                toast.error('Failed to delete expense');
            }
        }
    };

    const getCategoryInfo = (categoryId) => {
        return EXPENSE_CATEGORIES.find(cat => cat.id === Number(categoryId)) || EXPENSE_CATEGORIES[7];
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
                        Expense Tracking
                    </h1>
                    <p className="text-dark-400">Monitor your spending across categories</p>
                </div>
                <Button onClick={() => setShowModal(true)} icon={Plus}>
                    Add Expense
                </Button>
            </div>

            {/* Category Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {EXPENSE_CATEGORIES.slice(0, 4).map((category) => (
                    <Card key={category.id} className="text-center">
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <h4 className="text-sm text-dark-400 mb-1">{category.name}</h4>
                        <p className="text-lg font-bold text-dark-100">
                            {formatCurrency(
                                expenses
                                    .filter(e => e.categoryId === category.id)
                                    .reduce((sum, e) => sum + e.amount, 0)
                            )}
                        </p>
                    </Card>
                ))}
            </div>

            {/* Expense List */}
            <div>
                <h2 className="text-xl font-semibold text-dark-100 mb-4">
                    Recent Expenses
                </h2>
                <div className="space-y-4">
                    {expenses.map((expense) => {
                        const category = getCategoryInfo(expense.categoryId);
                        return (
                            <Card key={expense.id} hover className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="p-3 rounded-xl"
                                        style={{ backgroundColor: `${category.color}20` }}
                                    >
                                        <span className="text-2xl">{category.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark-100">
                                            {expense.description || category.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="default">{category.name}</Badge>
                                            <span className="text-sm text-dark-500">
                                                {formatDate(expense.expenseDate)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-xl font-bold text-danger-400">
                                        -{formatCurrency(expense.amount)}
                                    </p>
                                    {/* <button
                                        onClick={() => handleDelete(expense.id)}
                                        className="text-danger-400 hover:text-danger-300 text-sm px-3 py-1 rounded-lg hover:bg-danger-500/10 transition-colors"
                                    >
                                        Delete
                                    </button> */}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Add Expense Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Expense">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Amount"
                        type="number"
                        placeholder="1500"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-dark-300 mb-2">
                            Category
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {EXPENSE_CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, categoryId: category.id.toString() })}
                                    className={`
                    p-3 rounded-lg border-2 transition-all
                    ${formData.categoryId === category.id.toString()
                                            ? 'border-ai-500 bg-ai-500/10'
                                            : 'border-dark-700 bg-dark-800 hover:border-dark-600'
                                        }
                  `}
                                >
                                    <div className="text-2xl mb-1">{category.icon}</div>
                                    <div className="text-xs text-dark-300">{category.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <Input
                        label="Description (Optional)"
                        type="text"
                        placeholder="e.g., Groceries, Restaurant"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <Input
                        label="Date"
                        type="date"
                        value={formData.expenseDate}
                        onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                        required
                    />

                    <Button type="submit" loading={loading} className="w-full">
                        Add Expense
                    </Button>
                </form>
            </Modal>
        </motion.div>
    );
};

export default Expense;