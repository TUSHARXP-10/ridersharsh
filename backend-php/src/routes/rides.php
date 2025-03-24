<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Kreait\Firebase\Factory;

$factory = (new Factory)
    ->withServiceAccount(__DIR__ . '/../../firebase-credentials.json')
    ->createDatabase();

$app->post('/api/rides/create', function (Request $request, Response $response) use ($factory) {
    $data = $request->getParsedBody();
    $userId = $data['userId'] ?? '';
    $rideData = $data['rideData'] ?? [];
    
    try {
        $ride = [
            ...$rideData,
            'userId' => $userId,
            'createdAt' => date('c'),
            'status' => 'active'
        ];
        
        $newRide = $factory->getReference('rides')->push($ride);
        
        $responseData = [
            'success' => true,
            'rideId' => $newRide->getKey()
        ];
        
        $response->getBody()->write(json_encode($responseData));
        return $response->withHeader('Content-Type', 'application/json');
        
    } catch (\Exception $e) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }
});

$app->get('/api/rides/user/{userId}', function (Request $request, Response $response, array $args) use ($factory) {
    $userId = $args['userId'];
    
    try {
        $snapshot = $factory->getReference('rides')
            ->orderByChild('userId')
            ->equalTo($userId)
            ->getSnapshot();
        
        $rides = [];
        foreach ($snapshot->getValue() as $key => $value) {
            $rides[] = ['id' => $key, ...$value];
        }
        
        $responseData = [
            'success' => true,
            'rides' => $rides
        ];
        
        $response->getBody()->write(json_encode($responseData));
        return $response->withHeader('Content-Type', 'application/json');
        
    } catch (\Exception $e) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }
});

$app->put('/api/rides/{rideId}/status', function (Request $request, Response $response, array $args) use ($factory) {
    $rideId = $args['rideId'];
    $data = $request->getParsedBody();
    $status = $data['status'] ?? '';
    
    if (empty($status)) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'error' => 'Status is required'
        ]));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }
    
    try {
        $rideRef = $factory->getReference('rides/' . $rideId);
        $snapshot = $rideRef->getSnapshot();
        
        if (!$snapshot->exists()) {
            $response->getBody()->write(json_encode([
                'success' => false,
                'error' => 'Ride not found'
            ]));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
        
        $rideRef->update(['status' => $status]);
        
        $response->getBody()->write(json_encode([
            'success' => true,
            'message' => 'Ride status updated successfully'
        ]));
        return $response->withHeader('Content-Type', 'application/json');
        
    } catch (\Exception $e) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]));
        return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
    }
});