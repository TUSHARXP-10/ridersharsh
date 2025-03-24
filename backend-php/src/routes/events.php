<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Kreait\Firebase\Factory;

$factory = (new Factory)
    ->withServiceAccount(__DIR__ . '/../../firebase-credentials.json')
    ->createDatabase();

$app->post('/api/events/create', function (Request $request, Response $response) use ($factory) {
    $data = $request->getParsedBody();
    $eventData = $data['eventData'] ?? [];
    $organizerId = $data['organizerId'] ?? '';
    
    try {
        $event = [
            ...$eventData,
            'organizerId' => $organizerId,
            'createdAt' => date('c'),
            'status' => 'upcoming'
        ];
        
        $newEvent = $factory->getReference('events')->push($event);
        
        $responseData = [
            'success' => true,
            'eventId' => $newEvent->getKey()
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

$app->get('/api/events', function (Request $request, Response $response) use ($factory) {
    try {
        $snapshot = $factory->getReference('events')
            ->orderByChild('createdAt')
            ->getSnapshot();
        
        $events = [];
        foreach ($snapshot->getValue() as $key => $value) {
            $events[] = ['id' => $key, ...$value];
        }
        
        $responseData = [
            'success' => true,
            'events' => $events
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

$app->put('/api/events/{eventId}', function (Request $request, Response $response, array $args) use ($factory) {
    $eventId = $args['eventId'];
    $data = $request->getParsedBody();
    
    try {
        $factory->getReference('events/' . $eventId)
            ->update($data);
        
        $response->getBody()->write(json_encode([
            'success' => true
        ]));
        return $response->withHeader('Content-Type', 'application/json');
        
    } catch (\Exception $e) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }
});