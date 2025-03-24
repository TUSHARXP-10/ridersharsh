<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;

$factory = (new Factory)
    ->withServiceAccount(__DIR__ . '/../../firebase-credentials.json')
    ->createAuth();

$app->post('/api/auth/register', function (Request $request, Response $response) use ($factory) {
    $data = $request->getParsedBody();
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    try {
        $userProperties = [
            'email' => $email,
            'password' => $password,
            'emailVerified' => false
        ];
        
        $createdUser = $factory->createUser($userProperties);
        
        $responseData = [
            'success' => true,
            'user' => [
                'uid' => $createdUser->uid,
                'email' => $createdUser->email
            ]
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

$app->post('/api/auth/login', function (Request $request, Response $response) use ($factory) {
    $data = $request->getParsedBody();
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    try {
        $signInResult = $factory->signInWithEmailAndPassword($email, $password);
        
        $responseData = [
            'success' => true,
            'user' => [
                'uid' => $signInResult->data()['localId'],
                'email' => $signInResult->data()['email']
            ]
        ];
        
        $response->getBody()->write(json_encode($responseData));
        return $response->withHeader('Content-Type', 'application/json');
        
    } catch (\Exception $e) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]));
        return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
    }
});

$app->post('/api/auth/google', function (Request $request, Response $response) use ($factory) {
    $data = $request->getParsedBody();
    $idToken = $data['idToken'] ?? '';
    
    try {
        $verifiedIdToken = $factory->verifyIdToken($idToken);
        $uid = $verifiedIdToken->claims()->get('sub');
        $user = $factory->getUser($uid);
        
        $responseData = [
            'success' => true,
            'user' => [
                'uid' => $user->uid,
                'email' => $user->email
            ]
        ];
        
        $response->getBody()->write(json_encode($responseData));
        return $response->withHeader('Content-Type', 'application/json');
        
    } catch (FailedToVerifyToken $e) {
        $response->getBody()->write(json_encode([
            'success' => false,
            'error' => 'Invalid token'
        ]));
        return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
    }
});