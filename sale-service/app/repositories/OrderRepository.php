<?php

namespace App\repositories;

use App\Models\Order;
use App\repositories\interfaces\IOrderRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class OrderRepository implements IOrderRepository
{
    /**
     * @param array $columns
     * @param array $condition
     * @param array $relations
     * @param $limit
     * @param bool $orderByDesc
     * @return Collection|array
     */
    public function all(array $columns = ['*'], array $condition = [], array $relations = [], $limit = null, bool $orderByDesc = true): Collection|array
    {
        $query = Order::with($relations)
            ->select($columns)
            ->where($condition)
            ->limit($limit);

        if ($orderByDesc) {
            $query->latest();
        }

        return $query->get();
    }

    /**
     * Create new order
     * @param array $order
     * @param $total
     * @return mixed
     */
    public function create(array $order, $total): mixed
    {
        return Order::create([
            'customer_name' => $order['customer_name'],
            'customer_email' => $order['customer_email'],
            'quantity' => count($order['order_details']),
            'total' => $total
        ]);
    }

    /**
     * Find order by id
     * @param $id
     * @return Model|Collection|Builder|array|null
     */
    public function find($id): Model|Collection|Builder|array|null
    {
        return Order::with('order_detail')->find($id);
    }

    /**
     * Update order by id
     * @param $id
     * @param array $data
     * @return mixed
     */
    public function update($id, array $data): mixed
    {
        return Order::find($id)->update($data);
    }

    /**
     * Delete order by id
     * @param $id
     * @return int
     */
    public function delete($id): int
    {
        return Order::destroy($id);
    }
}
