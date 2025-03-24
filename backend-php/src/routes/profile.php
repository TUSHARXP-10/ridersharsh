<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Kreait\Firebase\Factory;

$factory = (new Factory)
    ->withServiceAccount(__DIR__ . '/../../firebase-credentials.json')
    ->createDatabase();

$app->get('/api/profile/{userId}', function (Request $request, Response $response, array $args) use ($factory) {
    $userId = $args['userId'];
    
    try {
        $snapshot = $factory->getReference('profiles/' . $userId)->getSnapshot();
        $profile = $snapshot->getValue() ?: [];
        
        $responseData = [
            'success' => true,
            'profile' => ['id' => $userId, ...$profile]
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

$app->put('/api/profile/{userId}', function (Request $request, Response $response, array $args) use ($factory) {
    $userId = $args['userId'];
    $data = $request->getParsedBody();
    
    try {
        $factory->getReference('profiles/' . $userId)->update($data);
        
        $responseData = [
            'success' => true,
            'profile' => ['id' => $userId, ...$data]
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