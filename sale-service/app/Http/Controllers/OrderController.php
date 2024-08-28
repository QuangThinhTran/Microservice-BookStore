<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\repositories\interfaces\IOrderRepository;
use App\services\OrderService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    protected array $columns = ['id', 'customer_name', 'customer_email', 'quantity', 'total', 'created_at'];

    private IOrderRepository $orderRepository;
    private OrderService $orderService;

    public function __construct(IOrderRepository $orderRepository, OrderService $orderService)
    {
        $this->orderRepository = $orderRepository;
        $this->orderService = $orderService;
    }

    /**
     * Checkout
     * @param CheckoutRequest $request
     * @return JsonResponse
     * */
    public function checkout(CheckoutRequest $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $input = $request->all();

            $order = $this->orderService->checkout($input);

            DB::commit();
            return response()->json([
                'result' => true,
                'data' => $order,
                'status' => 200
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Get order by id
     * @param string $customerName
     * @return JsonResponse
     */
    public function getOrderByCustomer(string $customerName): JsonResponse
    {
        $order = $this->orderRepository->all($this->columns, ['customer_name' => $customerName], ['orderDetails'], 10);
        return response()->json([
            'result' => true,
            'data' => $order,
            'status' => 200
        ]);
    }

    /**
     * Get all orders
     * @return JsonResponse
     */
    public function getOrders(): JsonResponse
    {
        $orders = $this->orderRepository->all($this->columns, [], ['orderDetails'], 10);
        return response()->json([
            'result' => true,
            'data' => $orders,
            'status' => 200
        ]);
    }
}
