<?php
use PHPUnit\Framework\TestCase;

class AuthTest extends TestCase
{
    private $app;
    private $database;

    protected function setUp(): void
    {
        $this->app = require __DIR__ . '/../src/index.php';
        $factory = (new \Kreait\Firebase\Factory)
            ->withServiceAccount(__DIR__ . '/../firebase-credentials.json');
        $this->database = $factory->createDatabase();
    }

    public function testUserRegistration()
    {
        $testUser = [
            'email' => 'test@example.com',
            'password' => 'Test@123',
            'name' => 'Test User',
            'phone' => '1234567890'
        ];

        $response = $this->createRequest('POST', '/api/auth/register', $testUser);
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($responseData['success']);
        $this->assertArrayHasKey('userId', $responseData);

        // Cleanup
        $this->database->getReference('users/' . $responseData['userId'])->remove();
    }

    public function testUserLogin()
    {
        $credentials = [
            'email' => 'test@example.com',
            'password' => 'Test@123'
        ];

        $response = $this->createRequest('POST', '/api/auth/login', $credentials);
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($responseData['success']);
        $this->assertArrayHasKey('token', $responseData);
        $this->assertArrayHasKey('user', $responseData);
    }

    public function testInvalidLogin()
    {
        $invalidCredentials = [
            'email' => 'wrong@example.com',
            'password' => 'wrongpassword'
        ];

        $response = $this->createRequest('POST', '/api/auth/login', $invalidCredentials);
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(401, $response->getStatusCode());
        $this->assertFalse($responseData['success']);
        $this->assertArrayHasKey('error', $responseData);
    }

    public function testTokenValidation()
    {
        $token = 'valid-test-token';
        $response = $this->createRequest('GET', '/api/auth/validate')
            ->withHeader('Authorization', 'Bearer ' . $token);
        
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($responseData['success']);
        $this->assertArrayHasKey('valid', $responseData);
    }

    public function testInvalidTokenValidation()
    {
        $invalidToken = 'invalid-token';
        $response = $this->createRequest('GET', '/api/auth/validate')
            ->withHeader('Authorization', 'Bearer ' . $invalidToken);
        
        $responseData = json_decode((string)$response->getBody(), true);

        $this->assertEquals(401, $response->getStatusCode());
        $this->assertFalse($responseData['success']);
        $this->assertArrayHasKey('error', $responseData);
    }

    private function createRequest(string $method, string $path, array $data = [])
    {
        $request = $this->createRequest($method, $path)
            ->withHeader('Content-Type', 'application/json');

        if (!empty($data)) {
            $request->getBody()->write(json_encode($data));
        }

        return $this->app->handle($request);
    }
}